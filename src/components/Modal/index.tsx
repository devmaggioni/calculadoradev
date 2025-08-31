// Modal.tsx
import { Overlay, ModalBox, CloseButton, Message } from './styles';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  message: string;
};

export default function Modal({ show, onClose, message }: ModalProps) {
  if (!show) return null;

  return (
    <Overlay>
      <ModalBox>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <Message>{message}</Message>
      </ModalBox>
    </Overlay>
  );
}
