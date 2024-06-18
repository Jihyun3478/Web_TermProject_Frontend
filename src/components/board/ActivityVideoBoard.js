import React, { useState, useEffect } from 'react';
import { fetchActivityVideos, saveActivityVideo } from '../../api/board/BoardApi';
import { Button, Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import PostActivityVideo from './PostActivityVideo';

const ActivityPhotoVideo = () => {
    const [posts, setPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);
  
    useEffect(() => {
      const loadPosts = async () => {
        try {
          const fetchedActivityVideos = await fetchActivityVideos('/activityVideo/findAll');
          setPosts(fetchedActivityVideos);
        } catch (error) {
          console.error('게시글 불러오기 에러:', error);
        }
      };
  
      loadPosts();
    }, []);

    const handlePostFormSubmit = async (postData) => {
      try {
        await saveActivityVideo(postData);
        console.log('게시글이 등록되었습니다!');
        setShowPostForm(false);
        const fetchedActivityVideos = await fetchActivityVideos('/activityVideo/findAll');
        setPosts(fetchedActivityVideos);
      } catch (error) {
        console.error('게시글 등록 오류: ', error);
      }
    };

  return (
    <Container className="mt-5">
        <Row className="mb-4">
          <Col>
            <h1>활동 영상</h1>
          </Col>
        </Row>
        {showPostForm ? (
          <PostActivityVideo onPostSubmit={handlePostFormSubmit} onCancel={() => setShowPostForm(false)} />
        ) : (
          <>
            <Row className="mb-4">
              <Col>
                <Button variant="primary" onClick={() => setShowPostForm(true)}>게시글 등록</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>활동 영상 목록</h2>
                <ListGroup>
                  {posts.map((post) => (
                    <ListGroup.Item key={post.id} className="d-flex align-items-start">
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
export default ActivityPhotoVideo;