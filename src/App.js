import React,{useState} from "react";
import "./App.css"


const App  = () =>{
  const [editing,setediting]=useState({
      id:"",
      isediting:false
  })
  const [list,setlist]=useState([])
  const [message,SetMessage]=useState({
      text:"",
      id:"",
  })
  const changeMessage = (e) =>{
      SetMessage({
          ...message,
          text:e.target.value,
      })
  }
  const handlesubmit = (e) =>{ 
      e.preventDefault();
      let newTodolist= {
          text:message.text,
          id:new Date().getTime().toString(),
      }
      setlist([...list,newTodolist])
      SetMessage({
          text:"",
          id:"",
      })
  }
  const handledelete = (comingid) =>{
       let filterlist= list.filter((eachObj)=>{
          return (eachObj.id!==comingid)
       })
       setlist(filterlist)

  }
  const changeeditstate =(id) =>{
      
      setediting({
          ...editing,
          id:id,
          isediting:true,
          
      })
      let editableitem = list.find((eachObj)=>eachObj.id===id);
      SetMessage({
          ...message,
          text:editableitem.text,
          id:editableitem.id,

      });

  }
  const handleEdit = (e) =>{
      e.preventDefault();
      let finalTodo= list.map((eachObj)=>{
         if(eachObj.id===editing.id){
          return{
              text:message.text,
              id:editing.id,
          };
         }else{
          return eachObj
         }
        
      });
      setlist(finalTodo);
      SetMessage({
          text:"",
          id:"",
      })
      setediting({
          isediting:false,
          id:"",
      })
  }
  return (
      <section className="maindiv">
          <div className="centerdiv">
              <div className="form-div">
                  <h1>Todo list </h1>
                  <form >
                      <input type="text" placeholder="enter the task" id = "messgae" name = "message" value={message.text} onChange={changeMessage} className="form-input" />

                      {editing.isediting ? (
                      <button className="btn-1" type="submit" onClick={handleEdit} >edit</button>
                      )

                      : (
                      <button className="btn-1" onClick={handlesubmit} type="submit">add</button>
                      )}

                  
                  </form>
                  <hr />
                  <div className="list">
                      {list.length===0 ? "there is no item in list" :
                          <ul>
                              {
                                  list.map((eachObj)=>{
                                      const {text,id}=eachObj;
                                      return(
                                          <li className="items" key = {id}>
                                            <div className="nesteditems">
                                                <span>{text}</span>
                                                <div className="btns">
                                                    <button  className="editdeletebtn" onClick={()=>changeeditstate(id)}>edit</button>
                                                    <button   className="editdeletebtn" onClick={()=>handledelete(id)}>delete</button>

                                                </div>
                                               
                                            </div>
                                              
                                              
                                          </li>
                                      )
                                  })
                              }
                          </ul>
                      } 
                  </div>

              </div>
          </div>
          
      </section>
     
  )
  
}

export default App;
