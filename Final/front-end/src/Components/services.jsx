import React from 'react'
import "../css/Services.css"
import { Link } from 'react-router-dom'
function Services() {
  return (
    <div>
    <div className="achievements">
    <div className="work">
        <div className="img1"></div>
        <p className="work-heading">Elder-care Services</p>
        <Link to="/Eldercare">
        <button >1</button>
        </Link>
        <p className="work-text">We Understand The Need Of Having Someone To Take Care Of Your Parents In Your Absence.At Anvayaa,We Provide Complete Elderly Care At Home.From Daily Care And Leisure Care To Payment Care Emergency Care And More,We Take Care If Them Like A Member Of Our Own family.</p>
    </div>
    <div className="work">
    <div className="img2">
        </div>
        <p className="work-heading">Post Operative Care</p>
        <Link to="/Eldercare">
        <button>2</button>
        </Link>
        <p className="work-text">After A Surgical Procedure,The Patient Needs Assistance Until He/She Recovers.Elders Take More Time To Recover And More Intense Care For Recovery.Our Team Of Experts Provide The Best Post-Operative Care At Home.</p>
    </div>
    <div className="work">
    <div className="img3"></div>
        <p className="work-heading">Diagonistics</p>
        <Link to="/Eldercare">
        <button>3</button>
        </Link>
        <p className="work-text">Besides Health And Elderly Care,We Also Provide For Daily Care Services Like Cooking,Domestic Help, Property Management Or Preparing A Customized Diet Plan And Covid Care Services.</p>
    </div>
    <div className="work">
    <div className="img3"></div>
        <p className="work-heading">Nurse Care At Home</p>
        <Link to="/Eldercare">
        <button>4</button>
        </Link>
        <p className="work-text">In Case Your Parents Or Any Elderly Require Constant Attention And Care,We Take No Chances In This Scenario.We Try To Understand Your Parent's Mentality And Match Them With A Convenient HomeStay Nurse Who Works Around The Clock To Care For Them.</p>
    </div>
    </div>
    <div className="achievements">
    <div className="work">
        <div className="img1"></div>
        <p className="work-heading">Doctor On-Call</p>
        <Link to="/Eldercare">
        <button>5</button>
        </Link>
        <p className="work-text">At Aramseivom .You Can Come In Contact With Doctors Across Multiple Specialities Over Voice Calls,Chats Or Videos.Our Team Will Make Sure To Create A Virtual Connection With The Doctor On The Call For Quick Redessal Of Your Parent's Concerning Health Issue</p>
    </div>
    <div className="work">
    <div className="img2">
        </div>
        <p className="work-heading">Senior Home Care Health Service</p>
        <Link to="/Eldercare">
        <button>6</button>
        </Link>
        <p className="work-text">Aramseivom,With its Large Team Of Specialist Doctors,Healthcare Professionals,Major Diagnostic And Pharmacy Centers As Partners,Ensure Smooth And Quality Senior Home Health Care Activities Such As Transportation To The Hospithal.With Paperwork And Discharge Formalities Are Also Taken Care Of To Make The Process Easier.</p>
    </div>
    <div className="work">
    <div className="img3"></div>
        <p className="work-heading">Comfortable Living</p>
        <Link to="/Eldercare">
        <button>7</button>
        </Link>
        <p className="work-text">Our Old Age Home offers spacious, well-maintained rooms and common areas designed for comfortable and homely living. We understand the importance of a cozy and welcoming atmosphere.</p>
    </div>
    <div className="work">
    <div className="img3"></div>
        <p className="work-heading">Safety and Security</p>
        <Link to="/Eldercare">
        <button>8</button>
        </Link>
        <p className="work-text">The safety and security of our residents are paramount. We have implemented comprehensive safety measures and provide 24/7 monitoring for peace of mind.</p>
    </div>
    </div>

    </div>
  )
}

export default Services