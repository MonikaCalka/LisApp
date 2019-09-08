import VerificationModel from './verificationModel';

class ResultModel {
    constructor()
    {
        this.DateOfResult = null;
        this.Description = null;
        this.ReasonForRepeat = null;
        this.EmployeeName = null;
        this.Verification = new VerificationModel();
    }
}

export default ResultModel;