import React, { useEffect } from "react";
import PlanCard from "./Card/PlanCard";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import './Plans.css'
const Plans = () => {
  var User = useSelector((state) => state.currentUserReducer);
  const plan = User?.result.planOpted || null
  const navigate = useNavigate();
  const profile = localStorage.getItem("Profile");
  useEffect(() => {
      if (!profile) {
        navigate("/Auth");
      }
  }, [navigate, profile]);
  return (
    <div className="home-container-1">
      <LeftSidebar />
      {profile && <div
        className="home-container-2"
        style={{
          display: "flex",
          height: "50%",
          gap: "15px",
          padding: "60px 10px",
        }}
      >
        <PlanCard isBuyable={false} noOfQuestions="1" price="0" plan="Free" />
        <PlanCard
          isBuyable={true}
          planOpted={plan}
          noOfQuestions="5"
          price={100}
          plan="Silver"
        />
        <PlanCard
          isBuyable={true}
          planOpted={plan}
          noOfQuestions="Unlimited"
          price={1000}
          plan="Gold"
        />
      </div>}
    </div>
  );
};

export default Plans;
