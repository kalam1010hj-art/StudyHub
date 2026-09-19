import { University, MapPin } from "lucide-react";
import Breadcrumbs from "../../components/Academic/Breadcrumbs/Breadcrumbs";
import AcademicPath from "../../components/Academic/AcademicPath/AcademicPath";
import AcademicSearch from "../../components/Academic/AcademicSearch/AcademicSearch";
import CollegeCard from "../../components/Academic/CollegeCard/CollegeCard";
import Loading from "../../components/Loading/Loading";
import styles from "./UniversityDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getColleges from "../../services/collegeServices";

export default function UniversityDetails() {
  let {universityId} = useParams()
  let [colleges,setColleges] = useState([])
  let [isLoading,setLoading] = useState(true)
  let [university,setUniversity] = useState({
    name:"university",
    code:"code",
    id:0
    
  })
  const [query, setQuery] = useState("");
  const visible = colleges.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.code.toLowerCase().includes(query.toLowerCase()),
  );

  console.log("University details rendered")
  useEffect(()=>{
     console.log("University details mounted")
     getColleges(universityId)
    
     .then((response)=>{
      console.log(response.data)
      setColleges(response.data.colleges)
      setUniversity(response.data.university)
      setLoading(false)
     })
     .catch((response)=>{
      console.log("got an error :", response)
     })
     .finally(()=>{
      setLoading(false)
     })

     return ()=>{
      console.log("University details unmounted")
     }
  },[])
  function handleOnchange(event){
     setQuery(event.target.value)
  }
  

  return (
    <main className={styles.page}>
      {isLoading?<Loading/>:
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: "Universities" }, { label: "JNTUH" }]} />
        <AcademicPath active={0} />
        <section className={styles.header}>
          <div className={styles.icon}>
            <University size={26} />
          </div>
          <div>
            <span>{university.code}</span>
            <h1>{university.name}</h1>
            <p>
              <MapPin size={15} /> Telangana
            </p>
          </div>
        </section>
        <section>
          <div className={styles.sectionHead}>
            <div>
              <span>ACADEMIC NETWORK</span>
              <h2>Explore Colleges</h2>
              <p>Find colleges affiliated with this university.</p>
            </div>
            <AcademicSearch placeholder="Search colleges..." value={query} onChange={handleOnchange} />
          </div>
          <div className={styles.grid}>
            {visible.map((c) => (
              <CollegeCard key={c.id} college={c} />
            ))}
          </div>
        </section>
      </div>
}
    </main>
  );
}
