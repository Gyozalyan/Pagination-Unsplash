import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight, faArrowLeft}  from "@fortawesome/free-solid-svg-icons"

import './App.css';


const SearchBar = () => {
  const [queryValue, setQueryValue] = useState('');
  const [totalData, setTotalData] = useState('');
  const [currentPage, setCurrentPage] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [searchResult, setSearchResult] = useState("")

  const itemsPerPage = 10;

  const fetchData = async () => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${queryValue}&client_id=${process.env.REACT_APP_ACESS_KEY}&per_page=${itemsPerPage}&page=${currentPage}`
    );
    const data = await response.json();
    setPhotos(data.results);
    setTotalData(data.total);
  };

  const handlePageClick = (event) => {

    setCurrentPage(event.selected + 1);
  

  };

  const handleButtonClick = () => {
    setCurrentPage(1)
    setSearchResult(queryValue)
 };


 useEffect(() => {
  fetchData();
}, [currentPage]);

  return (
    <>
    <div className="search-bar">
    <h3 className="default-text">Search Image</h3>
      <InputGroup style={{width:'50%'}}> 
    
        <Form.Control
        value={queryValue}
        onChange={(event) => {
          setQueryValue(event.target.value);
        }}
          placeholder="Search..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="success" id="button-addon2" onClick={handleButtonClick}>
        Search
        </Button>
      </InputGroup>
      </div>
        
          <Container>
          {searchResult &&  <Row> <Col lg={12} className="default-text"> <h3>Results for {searchResult}</h3></Col></Row>}
            <Row>
            <ReactPaginate
            breakLabel="..."
            nextLabel={<FontAwesomeIcon icon={faArrowRight}/>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={10}
            pageCount={Math.ceil(totalData / itemsPerPage)}
            previousLabel={<FontAwesomeIcon icon={faArrowLeft}/>}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageClassName="page-num"
            pageLinkClassName="page-num"
            activeLinkClassName="active-link"
            nextLinkClassName="page-num"
            previousClassName="page-num"
          />
            </Row>
          
          <Row>
          {photos.length > 0 ? (
          photos.map((photo, key) => (
            <Col key={key} xs={12} md={4} lg={3} className="found-images">
              {/* <FoundImage urlSmall={photo.urls.small} /> */}
              <a href={photo.urls.regular} target="_blank" rel="noreferrer" className='image-item'>
              <img src={photo.urls.small} alt={photo.alt_description} className='resultImage'/>
              </a>
              
            </Col>
          ))
        ) : (
          <Col lg={12} className="default-text"> No photos found.</Col>
        )}

          </Row>
    
      
      
     
     
      </Container>
      </>
  
  );
};

export default SearchBar;
