import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import "./Home.css"

import imgEstudiantes from "../Globales/img_G/kids-1093758_1920.jpg";
import imgDocetes from "../Globales/img_G/teacher-3765909_1920.jpg";

const LandingPage = () => {
  return (
    <div>
      <Header />
      {/* Portfolio Section */}
      <section className="page-section portfolio" id="portfolio">
        <div className="container">
          {/* Portfolio Section Heading */}
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Portfolio</h2>
          {/* Icon Divider */}
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
            <div className="divider-custom-line"></div>
          </div>
          {/* Portfolio Grid Items */}
          <div className="row justify-content-center">
            {/* Portfolio Item 1 */}
            <div className="col-md-6 col-lg-4 mb-5">
              <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                </div>
                <img className="img-fluid" src="assets/img/portfolio/cabin.png" alt="..." />
              </div>
            </div>
            {/* ... (similar structure for other portfolio items) */}
          </div>
        </div>
      </section>
    
      <Footer />
    </div>
  );
};

export default LandingPage;
