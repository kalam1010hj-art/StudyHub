import { ArrowRight, Building2, MapPin } from "lucide-react";
import styles from "./CollegeCard.module.css";
import { Link } from "react-router-dom";

export default function CollegeCard({ college }) {
  return (
    <Link to={`/colleges/${college.id}`} className={styles.card}>
    
      
      {college.logo ?
      <img  
      src={college.logo}
      alt={`${college.name} logo`}
       />:
        <div className={styles.icon}>
      
        <Building2 size={21} />
      </div>}
      <div className={styles.body}>
        
        <span className={styles.code}> {college.code} </span>
        <h3>{college.name}</h3>
        <p className={styles.location}>
         
          <MapPin size={14} />
          <span>
        
            {college.city}, {college.state}
          </span>
        </p>
        {college.description && (
          <p className={styles.description}> {college.description} </p>
        )}
      </div>
      <div className={styles.footer}>
    
        <span> Explore college </span>
        <ArrowRight size={17} />
      </div>
    </Link>
  );
}
