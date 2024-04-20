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
      <ModalHeader>Confirmation</ModalHeader>
      <ModalContent>
        <ModalDescription>
          <p>Are you sure?</p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button onClick={onCloseClick}>Cancel</Button>
        <Button onClick={onConfirmClick} positive>
          Delete
        </Button>
      </ModalActions>
    </Modal>
  );
}

export default ConfiramtionModal;
