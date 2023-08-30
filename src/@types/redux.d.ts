declare module "Type" {
  interface locationCoordinate {
    x: string;
    y: string;
  }
  export namespace reduxType {
    interface reduxStateType {
      modal: {
        value: {
          menuModal: boolean;
          alertModal: string;
          successModal: string;
          locationModal: boolean;
        };
      };
      user: {
        value: {
          email: string;
          displayName: string;
          photoURL: string;
          uid: string;
        };
      };
      location: {
        value: {
          location: Array<locationCoordinate>;
        };
      };
    }
  }
}
