import React,{useState, useEffect} from "react";
import API from "../../utils/API";

function Search(props) {
  const[state, setState] = useState({
    empArray: [
      {
        image:"",
        name: "Tom",
        email: "tom@tom.com",
        dob: "05-05-95",
        phone: "555-555-5555"
      },
      {
        image: "",
        name: "Jon",
        email: "jon@jon.com",
        dob: "06-06-96",
        phone: "666-666-6666"
      }
    ],
    filtArray: [
      {
        image:"",
        name: "Tom",
        email: "tom@tom.com",
        dob: "05-05-95",
        phone: "555-555-5555"
      },
      {
        image: "",
        name: "Jon",
        email: "jon@jon.com",
        dob: "06-06-96",
        phone: "666-666-6666"
      }
    ]
  })

  useEffect( () => {
    API.getEmployee().then( (data)=>{
      console.log(data)
      var cleanEmpArr = []
      data.data.results.map((singleUser)=>{
        var cleanUser = {}
        cleanUser.name = singleUser.name.first+" "+singleUser.name.last
        cleanUser.email = singleUser.email
        cleanUser.phone = singleUser.phone
        cleanUser.dob = singleUser.dob.date
        cleanUser.image = singleUser.picture.thumbnail
        cleanEmpArr.push(cleanUser)
      })
      console.log(cleanEmpArr)
      setState({...state, filtArray:cleanEmpArr,empArray:cleanEmpArr})
    })
  },[])


  const handleTyping= (e) => {
    console.log(e.target.value)
    console.log(e.target.value.length)
    var newFiltArray = []
    state.empArray.map((singleEmp) => {
      var compareStr = ""
      for (var i = 0; i < e.target.value.length; i++){
        compareStr += singleEmp.name[i]
      }
      console.log(compareStr)
      if (e.target.value.toLowerCase() === compareStr.toLocaleLowerCase()){
        console.log("return for the search", singleEmp.name)
        newFiltArray.push(singleEmp)
      }
    })

    setState({
      ...state,
      filtArray:newFiltArray
    })
  }

  return (
    <div className="container">
      <br></br>
      <div className="card">
        <div className="container text-center">
          <br></br>
          <form className="form">
            <input onChange={handleTyping} className="form-control" type="search" placeholder="Search" aria-label="Search"/>
          </form>
          <br></br>
        </div>
        <div className="content">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">DOB</th>
              </tr>
            </thead>
            <tbody>
              { state.filtArray.map((singleEmp)=>{
                  return(
                    <tr>
                      <th scope="row"><img src={singleEmp.image}/></th>
                      <td>{singleEmp.name}</td>
                      <td>{singleEmp.phone}</td>
                      <td>{singleEmp.email}</td>
                      <td>{singleEmp.dob}</td>
                    </tr>
                  )
                })
              }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Search;