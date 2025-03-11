import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProLogo from '../../Assets/ProLogo.svg'
import styles from './Analytics.module.css'
import Board from '../../Assets/Board.svg'
import Analytic from '../../Assets/Analytics.svg'
import Settings from '../../Assets/Settings.svg'
import Logout from '../../Assets/Logout.svg'
import Dot from '../../Assets/Dot.svg';
import { useNavigate } from 'react-router-dom'
import { getAllTask } from '../../API/Task'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


function LogoutOverlay({ onClose, onConfirm }) {
  return (
    <div className={`${styles.overlay}  `}>
      <div className={`${styles.overlayContent} w-50 d-flex flex-column text-center align-items-center justify-content-center `}>
        <p className={`${styles.confirmpara} text-center`} >Are you sure you want to log out?</p>
        <button className={`${styles.confirmButton}  text-nowrap`} onClick={onConfirm}>Yes</button>
        <button className={`${styles.closeButton}`} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}


function Analytics() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const [stateData] = useState(state?.taskData);
  const currentUserEmail = localStorage.getItem('userEmail');
  useEffect(() => {
    if (!currentUserEmail) {
      navigate('/login');
    }
  }, [currentUserEmail, navigate]);

  const [taskData, setTaskData] = useState({
    title: stateData?.title || '',
    Assign_to: stateData?.Assign_to || '',
    priority: stateData?.priority || '',
    date: stateData?.date || null,
    checklist: stateData?.checklist || [''],
    status: stateData?.status || ''
  });

  const [lowPriorityCount, setLowPriorityCount] = useState(0);
  const [moderatePriorityCount, setModeratePriorityCount] = useState(0);
  const [highPriorityCount, setHighPriorityCount] = useState(0);
  const [dueDateTasksCount, setDueDateTasksCount] = useState(0);
  const [backlog, setBacklog] = useState(0)
  const [todo, setTodo] = useState(0)
  const [inprogress, setInProgress] = useState(0)
  const [done, setDone] = useState(0)
  const [showOverlay, setShowOverlay] = useState(false);

  const fetchAllTasks = async () => {
    const response = await getAllTask();
    const userTasks = response.data.filter(task => {
      return task.userEmail === currentUserEmail || task.Assign_to === currentUserEmail;
    });
    setTaskData(userTasks);

    let lowCount = 0;
    let moderateCount = 0;
    let highCount = 0;
    let dueDateCount = 0;
    let backlogTasks = 0;
    let todoTasks = 0;
    let inprogressTasks = 0;
    let doneTasks = 0;

    userTasks.forEach(task => {

      if (task.priority === 'low priority') {
        lowCount++;
      } else if (task.priority === 'moderate priority') {
        moderateCount++;
      } else if (task.priority === 'high priority') {
        highCount++;
      }
      if (task.date) {
        dueDateCount++;
      }
      if (task.status === 'backlog') {
        backlogTasks++;
      } else if (task.status === 'to do') {
        todoTasks++;
      } else if (task.status === 'in progress') {
        inprogressTasks++;
      } else if (task.status === 'done') {
        doneTasks++
      }
    });

    setLowPriorityCount(lowCount);
    setModeratePriorityCount(moderateCount);
    setHighPriorityCount(highCount);
    setDueDateTasksCount(dueDateCount);
    setBacklog(backlogTasks)
    setInProgress(inprogressTasks)
    setTodo(todoTasks)
    setDone(doneTasks)
  };

  useEffect(() => {
    fetchAllTasks();
  });

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className={`${styles.body} container-fluid  `} >
      <div className={`${styles.left} col-lg-2.5 col-md-2 col-sm-3 col-xs-3 `} >

        <div className={`${styles.flex} d-flex flex-column flex-xs-column flex-sm-column flex-md-row flex-lg-row  `} >
          <img src={ProLogo} className={`${styles.prologo} img img-fluid `} />
          <p className={`${styles.pro} fs-3 text-center `} >Pro Manage</p>
        </div>

        <div className={`${styles.flex} d-flex flex-column flex-xs-column flex-sm-column flex-md-row flex-lg-row`} onClick={() => { navigate('/') }}>
          <img src={Board} className={`${styles.board} img img-fluid`} />
          <p className={styles.boardtext} >Board</p>
        </div>

        <div className={`${styles.flexboard} d-flex flex-column flex-xs-column flex-sm-column flex-md-row flex-lg-row `} >
          <img src={Analytic} className={`${styles.analytics} img img-fluid`} />
          <p className={`${styles.analyticstext} fs-6 `}>Analytics</p>
        </div>

        <div className={`${styles.flex} d-flex flex-column flex-xs-column flex-sm-column flex-md-row flex-lg-row`} onClick={() => { navigate('/settings') }} >
          <img src={Settings} className={`${styles.settings} img img-fluid`} />
          <p className={styles.settingstext} >Settings</p>
        </div>

        <div className={styles.flexy} onClick={() => setShowOverlay(true)} >
          <img src={Logout} className={`${styles.logout} img img-fluid`} />
          <p className={styles.log} >Log out </p>
        </div>

      </div>
      <div className={`${styles.separator} bg-info col-lg-3 `} ></div>

      <div className={`${styles.right} container col-lg-9.5 col-md-10 col-sm-9 col-xs-9 `} >
        <div className={styles.header}>
          <p className={`${styles.analytics} fs-3`}>Analytics</p>
        </div>

        <div className={`${styles.full} d-flex flex-column flex-lg-row flex-md-row flex-sm-column ms-5`}  >

          <div className={`${styles.half} list-group d-flex flex-column align-items-center justify-content-between `}>
            <div className={`${styles.section1} col-xs-6 col-sm-6 col-md-12 col-lg-9 list-group-item flex-fill text-center bg-secondary text-white align-items-center justify-content-center`} >
              <p className={`${styles.text} fs-4 text-nowrap`} >Expired Jobs</p>
              <p className={styles.number1} >{backlog}</p>
            </div>

            <div className={`${styles.section2} col-xs-6 col-sm-6 col-md-12 col-lg-9 list-group-item flex-fill text-center bg-secondary text-white align-items-center justify-content-center`} >
              <p className={`${styles.text} fs-4 text-nowrap `} >New Jobs</p>
              <p className={styles.number2} >{todo}</p>
            </div>

            <div className={`${styles.section3} col-xs-6 col-sm-6 col-md-12 col-lg-9 list-group-item flex-fill text-center bg-secondary text-white align-items-center justify-content-center`} >
              <p className={`${styles.text} fs-4 text-nowrap`} >Active Jobs</p>
              <p className={styles.number3} >{inprogress}</p>
            </div>

            <div className={`${styles.section4} col-xs-6 col-sm-6 col-md-12 col-lg-9 list-group-item flex-fill text-center bg-secondary text-white align-items-center justify-content-center`} >
              <p className={`${styles.text} fs-4 text-nowrap`} >Completed Jobs</p>
              <p className={styles.number4} >{done}</p>
            </div>
          </div>

          <div className={`${styles.half} list-group d-flex flex-column align-items-center justify-content-between`} >
            <div className={`${styles.section1} col-xs-6 col-sm-6 col-md-12 col-lg-9  list-group-item flex-fill text-center bg-secondary text-white align-items-center justify-content-center`} >
              <p className={`${styles.text} fs-4 text-nowrap`} >Low Priority</p>
              <p className={styles.digit1} >{lowPriorityCount}</p>
            </div>

            <div className={`${styles.section2} col-xs-6 col-sm-6 col-md-12 col-lg-9 list-group-item flex-fill text-center bg-secondary text-white align-items-center justify-content-center`} >
              <p className={`${styles.text} fs-4 text-nowrap`} >Moderate Priority</p>
              <p className={styles.digit2} >{moderatePriorityCount}</p>
            </div>

            <div className={`${styles.section3} col-xs-6 col-sm-6 col-md-12 col-lg-9 list-group-item flex-fill text-center bg-secondary text-white align-items-center justify-content-center`} >
              <p className={`${styles.text} fs-4 text-nowrap`} >High Priority</p>
              <p className={styles.digit3} >{highPriorityCount}</p>
            </div>

            <div className={`${styles.section4} col-xs-6 col-sm-6 col-md-12 col-lg-9 list-group-item flex-fill text-center bg-secondary text-white align-items-center justify-content-center`} >
              <p className={`${styles.text} fs-4 text-nowrap`} >Due Date Jobs</p>
              <p className={styles.digit4} >{dueDateTasksCount}</p>
            </div>
          </div>
        </div>

        {showOverlay && (
          <LogoutOverlay
            onClose={() => setShowOverlay(false)}
            onConfirm={handleLogout}
          />
        )}

      </div>
    </div>
  )
}

export default Analytics