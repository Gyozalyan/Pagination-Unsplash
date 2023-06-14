import '../App.css'
import Col from 'react-bootstrap/Col';



const LoadingFrame = ({ item }) => {
    const arr = [...Array(item).keys()]

    return arr.map((_, index) => (
        <Col key={index} xs={12} md={4} lg={3} className="found-images">
        
          <div className='resultImage loadingFrame animate-pulse'></div>
      
        </Col>
      ))
  }

export default LoadingFrame