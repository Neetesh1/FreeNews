
import { NavLink } from 'react-router-dom';
import Select from 'react-select';


const NavBar = (props) => {

  console.log(props.country)

 

  const onChangeCountry = (op) =>{
    props.setCountry(op.value);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">FreeNews</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')} aria-current="page" to="/">Home</NavLink></li>

            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')} to="/business">Business</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')} to="/entertainment">Entertainment</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')} to="/general">General</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')} to="/health">Health</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')} to="/science">Science</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')} to="/sports">Sports</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')} to="/technology">Technology</NavLink></li>

          </ul>
          
            <Select
                
                onChange={onChangeCountry}
                placeholder={'Choose a Country'}
                options={props.countriesOptions}
                width='200px'
              />
        </div>


      </div>
    </nav>
  )

}

export default NavBar