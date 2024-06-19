import React, { useState, useEffect } from "react";
import {
  fetchApplyClubDetail,
  acceptApplyClub,
  refuseApplyClub,
} from "../../api/admin/AdminApi";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ApplyClubDetail = ({ onClose }) => {
  const { applyClubId } = useParams();
  const [applyClubDetail, setApplyClubDetail] = useState(null);
  const [refuseReason, setRefuseReason] = useState("");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDetail = async () => {
      try {
        if (!applyClubId) return;

        const token = sessionStorage.getItem("token");
        const data = await fetchApplyClubDetail(applyClubId, token);
        setApplyClubDetail(data);
      } catch (error) {
        setError("동아리 신청 상세 정보를 불러오는 중 오류가 발생했습니다.");
        console.error(error);
      }
    };

    loadDetail();
  }, [applyClubId]);

  const handleAccept = async () => {
    const token = sessionStorage.getItem("token");
    try {
      await acceptApplyClub(applyClubId, token);
      setNotification("동아리 신청이 승인되었습니다.");
      setApplyClubDetail((prevDetail) => ({
        ...prevDetail,
        applyClubStatus: "ACCEPT",
      }));
      if (typeof onClose === "function") onClose();
    } catch (error) {
      setError("동아리 신청 승인 과정에서 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const handleRefuse = async () => {
    const token = sessionStorage.getItem("token");
    try {
      await refuseApplyClub(applyClubId, refuseReason, token);
      setNotification("동아리 신청이 거절되었습니다.");
      setRefuseReason("");
      setShowRefuseModal(false);
      setApplyClubDetail((prevDetail) => ({
        ...prevDetail,
        applyClubStatus: "REFUSE",
      }));
      if (typeof onClose === "function") onClose();
    } catch (error) {
      setError("동아리 신청 거절 과정에서 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const handleRefuseReasonChange = (e) => {
    setRefuseReason(e.target.value);
  };

  const handleGoBack = () => {
    navigate("/admin");
  };

  if (!applyClubDetail) {
    return <div>Loading...</div>;
  }

  const { applyClubStatus } = applyClubDetail;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-secondary" onClick={handleGoBack}>
          이전
        </button>
        <h3 className="text-center">선택한 동아리 신청 상세 정보</h3>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {notification && (
        <div className="alert alert-success">{notification}</div>
      )}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">
            동아리 이름: {applyClubDetail.clubName}
          </h5>
          <p className="card-text">
            <strong>신청자 이름:</strong> {applyClubDetail.name}
          </p>
          <p className="card-text">
            <strong>신청자 소속:</strong> {applyClubDetail.major}
          </p>
          <p className="card-text">
            <strong>신청자 학번:</strong> {applyClubDetail.stuNum}
          </p>
          <p className="card-text">
            <strong>전화번호:</strong> {applyClubDetail.phoneNum}
          </p>
          <p className="card-text">
            <strong>지도 교수 이름:</strong> {applyClubDetail.pname}
          </p>
          <p className="card-text">
            <strong>지도 교수 전공:</strong> {applyClubDetail.pmajor}
          </p>
          <p className="card-text">
            <strong>지도 교수 전화번호:</strong> {applyClubDetail.pphoneNum}
          </p>
          <p className="card-text">
            <strong>신청 상태:</strong> {applyClubStatus}
          </p>
          {applyClubStatus !== "ACCEPT" && applyClubStatus !== "REFUSE" && (
            <>
              <button className="btn btn-success me-2" onClick={handleAccept}>
                승인
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowRefuseModal(true)}
              >
                거절
              </button>
            </>
          )}
        </div>
      </div>

      {showRefuseModal && (
        <div
          className="modal fade show"
          id="refuseModal"
          tabIndex="-1"
          aria-labelledby="refuseModalLabel"
          aria-hidden="true"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="refuseModalLabel">
                  동아리 신청 거절
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowRefuseModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">거절 사유:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={refuseReason}
                    onChange={handleRefuseReasonChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowRefuseModal(false)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleRefuse}
                >
                  거절
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyClubDetail;
