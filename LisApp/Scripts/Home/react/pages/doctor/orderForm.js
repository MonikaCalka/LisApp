import React from 'react';
import { Trans } from 'react-i18next';
import { getJson } from '../../services/rests';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';

const emptyState = {
    IdPatient: "",
    FirstName: "",
    Surname: "",
    Sex: "",
    Pesel: "",
    Phone: "",
    IdCardNumber: "",
    Insurance: "",
    IdPriority: "",
    DoctorName: "",
    DateOfOrder: "",
    IdStatus: "",
    Studies: []
};



class OrderForm extends React.Component {

    constructor(props) {
        super(props);

      
    }

    render() {
      
    }
}

export default OrderForm;