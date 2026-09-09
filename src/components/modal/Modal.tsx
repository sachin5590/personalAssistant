import { ReactNode } from 'react';
import styles from './modal.module.css';

interface ModalProps {
  title: string;
  disabled?: boolean;
  cancelText?: string;
  submitButtonText?: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
}

const Modal = ({
    title,
    onClose,
    children,
    onSubmit,
    disabled = false,
    cancelText = 'Cancel',
    submitButtonText = 'Submit'
}: ModalProps) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={handleModalClick}>
        
        <div className={styles['modal-header']}>
          <h2 className={styles['modal-title']}>{title}</h2>
          <button className={styles['close-btn']} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        {children}

        <div className={styles['modal-actions']}>
          <button type="button" className={`${styles['btn']} ${styles['btn-secondary']}`} onClick={onClose}>
            {cancelText}
          </button>
          <button type="submit" className={`${styles['btn']} ${styles['btn-primary']}`} onClick={onSubmit} disabled={disabled}>
            {submitButtonText}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modal;
