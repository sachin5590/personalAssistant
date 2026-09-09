import { ReactNode } from "react";
import Navbar from "./Navbar";
import styles from './layout.module.css';

const Header = () => {
  return (
    <header>
      <h2>Personal Assistant</h2>
    </header>
  )
};

const Layout = ({
    content,
    isDesktop
}: { content: ReactNode, isDesktop: boolean }) => {
    const onModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    }

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Header />
                {isDesktop && 
                    <nav className={styles.navbar}>
                        <Navbar />
                    </nav>}

                <span className={styles.toggle_container}>
                    <input className={styles.toggle_checkbox} type="checkbox" id="switch" name="mode" onChange={onModeChange} />
                    <label htmlFor="switch" className={styles.label}>Toggle</label>
                </span>
            </div>
            <div className={isDesktop ? styles.content : styles.mobile_content}>
                {content}
            </div>
            {!isDesktop && <nav className={styles.mobile_navbar}>
                <Navbar />
            </nav>}
        </div>
    );
};

export default Layout;