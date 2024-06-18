import React, { useState, useEffect } from "react";
import {
  fetchApplyClubDetail,
  acceptApplyClub,
  refuseApplyClub,
} from "../../api/admin/AdminApi";
import { useParams } from "react-router-dom";

const ApplyClubDetail = ({ onClose }) => {
  const { applyClubId } = useParams();
  const [applyClubDetail, setApplyClubDetail] = useState(null);
  const [refuseReason, setRefuseReason] = useState("");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false); // 동아리 승인 여부를 관리하는 상태 추가
  const [showRefuseModal, setShowRefuseModal] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        if (!applyClubId) return;

        const token = sessionStorage.getItem("token");
        const data = await fetchApplyClubDetail(applyClubId, token);
        setApplyClubDetail(data);

        // 서버에서 받은 데이터에 따라 승인 여부를 설정합니다.
        if (data && data.isAccepted) {
          setIsAccepted(true);
        }
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
      setIsAccepted(true); // 승인됨으로 상태 변경
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
      if (typeof onClose === "function") onClose();
    } catch (error) {
      setError("동아리 신청 거절 과정에서 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const handleRefuseReasonChange = (e) => {
    setRefuseReason(e.target.value);
  };

  if (!applyClubDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center">선택한 동아리 신청 상세 정보</h3>
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
          {!isAccepted && ( // 승인되지 않은 경우에만 버튼을 표시합니다.
            <button className="btn btn-success me-2" onClick={handleAccept}>
              승인
            </button>
          )}
          <button
            className="btn btn-danger"
            onClick={() => setShowRefuseModal(true)}
            disabled={isAccepted} // 승인된 경우에는 버튼을 비활성화합니다.
          >
            거절
          </button>
        </div>
      </div>

      {/* Refuse Modal */}
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
