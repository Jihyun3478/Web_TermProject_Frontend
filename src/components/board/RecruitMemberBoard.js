import React, { useState, useEffect } from 'react';
import { fetchRecruitMember, saveRecruitMember } from '../../api/board/BoardApi';
import PostRecruitMember from './PostRecruitMember';
import { Button, Container, Row, Col, ListGroup, Image } from 'react-bootstrap';

const RecruitMemberBoard = () => {
    const [posts, setPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);
  
    useEffect(() => {
      const loadPosts = async () => {
        try {
          const fetchedRecruitMember = await fetchRecruitMember('/recruitMember/findAll');
          setPosts(fetchedRecruitMember);
        } catch (error) {
          console.error('게시글 불러오기 에러:', error);
        }
      };
  
      loadPosts();
    }, []);

    const handlePostFormSubmit = async (postData) => {
      try {
        await saveRecruitMember(postData);
        console.log('게시글이 등록되었습니다!');
        setShowPostForm(false);
        const fetchedRecruitMember = await fetchRecruitMember('/recruitMember/findAll');
        setPosts(fetchedRecruitMember);
      } catch (error) {
        console.error('게시글 등록 오류: ', error);
      }
    };
  
    return (
      <Container className="mt-5">
        <Row className="mb-4">
          <Col>
            <h1>부원 모집</h1>
          </Col>
        </Row>
        {showPostForm ? (
          <PostRecruitMember onPostSubmit={handlePostFormSubmit} onCancel={() => setShowPostForm(false)} />
        ) : (
          <>
            <Row className="mb-4">
              <Col>
                <Button variant="primary" onClick={() => setShowPostForm(true)}>게시글 등록</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>게시글 목록</h2>
                <ListGroup>
                  {posts.map((post) => (
                    <ListGroup.Item key={post.id} className="d-flex align-items-start">
                      {post.imageRoute && (
                        <Image
                          src={`http://localhost:8080/master/board/image/${post.imageRoute}`}
                          rounded
                          className="me-3"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                      )}
                      <div className="flex-grow-1">
                        <h5>제목: {post.title}</h5>
                        <p className="mb-1">작성자: {post.writer}</p>
                        <p>내용: {post.content}</p>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    );
};

export default RecruitMemberBoard;
