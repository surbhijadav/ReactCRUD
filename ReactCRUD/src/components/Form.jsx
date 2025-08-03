import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form = ({ data, setData, updateDataapi, setUpdataapi}) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

let isEmpty = Object.keys(updateDataapi).length === 0;

// get the updated data and  add into input field
useEffect(() => {
    updateDataapi && setAddData({
        title:updateDataapi.title || "",
        body: updateDataapi.body || "",
    })
},[updateDataapi]);

const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    const res = await postData(addData);
    if (res.status === 201) {
      setData([...data, res.data]);
     setAddData({title: "", body: "" });

    }
  };

  //updatePostdata
  const updatePostdata = async () => {
    try {
      const res = await updateData(updateDataapi.id,addData);

      if(res.status === 200) {
        setData((prev) =>{
            return prev.map((curElem) => {
                return curElem.id === res.data.id ? res.data : curElem;
            })
          })
          setAddData({title : "", body : ""});
          setUpdataapi({})
      }
    } catch (error) {
        console.log(error);
        
    }

  }

  // 🛠️ Fix: Add `e` parameter here
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if(action === "Add") {
        addPostData();
    }else   if(action === "Edit") {
        updatePostdata();

    }

  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="body">Body:</label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add post"
          id="body"
          name="body"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
    </form>
  );
};
