import React, {useState, useEffect} from "react";

function ApiDisplayTest() {
  const [data, setData] = useState([]);

  useEffect(() => {
    //function to fetch data from an express api
    const fetchData = async () => {
      try{
        const response = await fetch("http://localhost:3000/api/data");

        if(!response){
          throw new Error("failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      }catch(error){
        console.log(error)  
      }
    }

    //call the fetch data function
    fetchData()
  }, [])

  return(
    <div>
      <h1 className="bg-red-300">Data from API</h1>
      <ul>
        {
          data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default ApiDisplayTest;