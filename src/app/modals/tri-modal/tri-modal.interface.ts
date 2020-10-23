export interface TriModalInterface {
    type: string;
    header: string;
    text: string[];
    buttons: ModalButton[];
    state: string;
}

export interface ModalButton {
    name: string;
    class: string[];
}
