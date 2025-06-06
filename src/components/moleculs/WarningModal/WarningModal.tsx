import NiceModal, { muiDialogV5, useModal } from "@ebay/nice-modal-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/Dialog";

interface IWarningModalProps {
  title?: string;
  warningMessage?: string;
  onConfirm?: () => void;
}

const WarningModal = NiceModal.create<IWarningModalProps>(
  ({ title = "Warning", warningMessage, onConfirm }) => {
    const modal = useModal();

    const handleClose = () => {
      modal.hide();
    };

    const handleConfirm = () => {
      onConfirm?.();
      modal.hide();
    };

    return (
      <Dialog {...muiDialogV5(modal)}>
        <DialogContent aria-describedby={undefined} showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
          </DialogHeader>

          <p className="bg-transparent text-center mb-5">{warningMessage}</p>

          <div className="flex bg-transparent justify-between">
            <button
              className="w-20 bg-black/55 rounded-lg p-2 font-semibold text-white cursor-pointer hover:bg-black/30"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className="w-35 bg-black/55 rounded-lg p-2 font-bold text-white cursor-pointer hover:bg-black/30"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

export default WarningModal;
