﻿import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson, getUrl } from '../../services/rests';
import { withAlert } from 'react-alert';
import i18n from '../../i18n';
import StudyForm from './studyForm';


const columns = [
    {
        name: <Trans>OrderId</Trans>,
        selector: 'IdOrder',
        sortable: true
    },
    {
        name: <Trans>StudyId</Trans>,
        selector: 'IdStudy',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Patient</Trans>,
        selector: 'Patient',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>DateOfOrder</Trans>,
        selector: 'DateOfOrder',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Profile</Trans>,
        selector: 'Profile',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Status</Trans>,
        selector: 'Status',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Priority</Trans>,
        selector: 'Priority',
        sortable: true,
        wrap: true
    }
];

const titleOfTable = <Trans>Studies</Trans>;

const searchableColumn = [{ name: "Patient", id: 0 }, { name: "DateOfOrder", id: 1 }, { name: "Profile", id: 2 }, { name: "Status", id: 3 }, { name: "Priority", id: 4 }];

class DoctorStudiesPage extends React.Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.formRef = React.createRef();
        this.state = {
            data: [],
            actualRow: null,
            actualLang: 'pl',
            disableMode: true,
            titleOfModal: "",
            mode: "",
            postResult: "",
            selectedData: null
        };
    }

    componentDidMount() {
        this.setStudyList();
    }
    componentDidUpdate() {
        if (this.state.actualLang !== i18n.language) {
            this.setStudyList();
            this.setLanguage();
        }
    }

    setStudyList() {
        getJson("Doctor/GetStudyList", response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.setState({ data: responseJson.data });
                });
            }
        });
    }
    setLanguage() {
        this.setState({ actualLang: i18n.language });
    }

    rowClick = (row) => {
        this.setState({
            actualRow: row,
            disableMode: row === null
        });
    };

    getStudyAndOpenModal = (id) => {
        getJson("Doctor/GetStudy?id=" + id, response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.setState({ selectedData: responseJson.data });
                    this.modalRef.current.openModal();
                    console.log(response);
                });
            }
            console.log(response);
        });
    }

    getReport = () => {

        let win = window.open(getUrl + "Doctor/GetReport?id=" + this.state.actualRow.IdStudy + "&lang=" + i18n.language + "&t="
            + localStorage.getItem("token").toString().replace('+', 'xMl3Jkaaswss').replace('/', 'Por21Ld105sE78').replace('=', 'Ml32XXASsd1dd')
            , "_blank");
        win.focus;

    }

    //getReport = () => {
    //    var win = window.open();

    //    getJson("Doctor/GetReport?id=" + this.state.actualRow.IdStudy, response => {
    //        //var data = new Blob([res.response], { type: 'application/pdf' });
    //        //var csvURL = window.URL.createObjectURL(data);
    //        //var tempLink = document.createElement('a');
    //        //tempLink.href = csvURL;
    //        //tempLink.setAttribute('download', 'filename.pdf');
    //        //tempLink.click();

    //        win.location = response.url;
    //      //  win.Blob = new Blow(response);

    //        win.focus();

    //    });


    //}

    //getReport = () => {

    //    getJson("Doctor/GetReport?id=" + this.state.actualRow.IdStudy, response => {

    //        response.text().then(function (text) {
    //            var binaryString = text;
    //            var binaryLen = binaryString.length;
    //            var bytes = new Uint8Array(binaryLen);
    //            for (var i = 0; i < binaryLen; i++) {
    //                var ascii = binaryString.charCodeAt(i);
    //                bytes[i] = ascii;
    //            }


    //            var data = new Blob([bytes], { type: 'application/pdf' });
    //            var csvURL = window.URL.createObjectURL(data);
    //            var tempLink = document.createElement('a');
    //            tempLink.href = csvURL;
    //            tempLink.setAttribute('download', 'filename.pdf');
    //            tempLink.click();
    //        });

    //    });


    //}


    openShowModal = () => {
        this.setState({
            titleOfModal: "DetailsAndResult",
            mode: "show"
        });
        this.getStudyAndOpenModal(this.state.actualRow.IdStudy);
    };

    closeModal = () => {
        this.modalRef.current.closeModal();
    }

    onChangeStudy = (id) => {
        this.modalRef.current.closeModal();
        this.setState({
            titleOfModal: "DetailsAndResult",
            mode: "show"
        });
        this.getStudyAndOpenModal(id);
    }

    render() {
        return (
            <div>
                <CustomButton onClick={this.openShowModal} text={<Trans>DetailsAndResult</Trans>} disable={this.state.disableMode} />
                <CustomButton onClick={this.getReport} text={<Trans>Report</Trans>} disable={this.state.disableMode} />


                <CustomModal ref={this.modalRef}>
                    <StudyForm
                        title={this.state.titleOfModal}
                        mode={this.state.mode}
                        data={this.state.selectedData}
                        ref={this.formRef}
                        onAccept={this.onAccept}
                        onCancel={this.closeModal}
                        onChangeStudy={this.onChangeStudy}
                    />
                </CustomModal>
                <br />

                <CustomTable key={i18n.language}
                    titleOfTable={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                    onRowClicked={this.rowClick}
                    idName="IdStudy"
                    searchableColumn={searchableColumn}
                />
            </div>
        );
    }
}

export default withAlert()(DoctorStudiesPage);