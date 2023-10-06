
import './Create.css';

const TestFail = () => {
    const goBack = () =>{
        console.log("Will go back")
    }
    return(
    <div className="delete-dialog-overlay">
      <div className="delete-dialog">
        <div className="delete-dialog-content">
          <p>You need to pass the test befor you can submit</p>
          <div className="button-container">
            <button onClick={goBack}>Ok</button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default TestFail;