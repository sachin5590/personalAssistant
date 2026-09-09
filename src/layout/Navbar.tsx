import styles from './layout.module.css';

const Navbar = () => {
    return (
        <>
            <a href="#today" className={`${styles.link} ${window.location.hash === '#today' ? styles.active : ''}`} style={{ marginRight: '10px' }}>Today</a>
            <a href="#archive" className={`${styles.link} ${window.location.hash === '#archive' ? styles.active : ''}`} style={{ marginRight: '10px' }}>Archive</a>
            <a href="#all-tasks" className={`${styles.link} ${window.location.hash === '#all-tasks' ? styles.active : ''}`}>All Tasks</a>
        </>
    );
};

export default Navbar;