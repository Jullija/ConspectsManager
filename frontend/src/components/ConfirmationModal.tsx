import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal
} from 'semantic-ui-react';

interface ConfiramtionModalProps {
  open: boolean;
  onConfirmClick: () => void;
  onCloseClick: () => void;
}

function ConfiramtionModal({ onConfirmClick, open, onCloseClick }: ConfiramtionModalProps) {
  return (
    <Modal open={open} style={{ width: 400 }}>
      <ModalHeader>Potwierdzenie</ModalHeader>
      <ModalContent>
        <ModalDescription>
          <p>Jesteś pewien/a?</p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button onClick={onCloseClick}>Anuluj</Button>
        <Button onClick={onConfirmClick} positive>
          Usuń
        </Button>
      </ModalActions>
    </Modal>
  );
}

export default ConfiramtionModal;
