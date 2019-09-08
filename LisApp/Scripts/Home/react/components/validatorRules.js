import React from 'react';
import { Trans } from 'react-i18next';

const requiredField = { validators: ['required'], errorMessages: [<Trans>RequiredField</Trans>], requiredMark: true };
const requiredMax15 = { validators: ['required', 'maxStringLength:15'], errorMessages: [<Trans>RequiredField</Trans>, <Trans>Max15</Trans>], requiredMark: true };
const requiredMax50 = { validators: ['required', 'maxStringLength:50'], errorMessages: [<Trans>RequiredField</Trans>, <Trans>Max50</Trans>], requiredMark: true };
const requiredPesel = { validators: ['required', 'maxStringLength:11', 'isNumber'], errorMessages: [<Trans>RequiredField</Trans>, <Trans>Max11</Trans>, <Trans>IsNumber</Trans>], requiredMark: true };
const requiredPhone = { validators: ['required', 'maxStringLength:9', 'isNumber'], errorMessages: [<Trans>RequiredField</Trans>, <Trans>Max9</Trans>, <Trans>IsNumber</Trans>], requiredMark: true };
const requiredFloat = { validators: ['required', 'IsFloat'], errorMessages: [<Trans>RequiredField</Trans>, <Trans>isFloat</Trans>], requiredMark: true };

const requiredOrNNMax50 = { validators: ['required', 'maxStringLength:50'], errorMessages: [<Trans>RequiredFieldNN</Trans>, <Trans>Max50</Trans>], requiredMark: true };
const requiredOrNNMax15 = { validators: ['required', 'maxStringLength:15'], errorMessages: [<Trans>RequiredFieldNN</Trans>, <Trans>Max15</Trans>], requiredMark: true };
const requiredPeselOrNN = { validators: ['required', 'maxStringLength:11', 'matchRegexp:^(([0-9]{2}[0-1][0-9][0-3][0-9]{6})|NN|([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]))$'], errorMessages: [<Trans>RequiredFieldNN</Trans>, <Trans>Max11</Trans>, <Trans>IsPeselNN</Trans>], requiredMark: true };
const requiredPhoneOnNN = { validators: ['required', 'maxStringLength:9', 'matchRegexp:^(([0-9]*|NN))$'], errorMessages: [<Trans>RequiredFieldNN</Trans> , <Trans>Max9</Trans> , <Trans>IsNumberNN</Trans>], requiredMark: true };

const isEmail = { validators: ['maxStringLength:50', 'isEmail'], errorMessages: [<Trans>Max50</Trans>, <Trans>IsEmail</Trans>] };
const max50 = { validators: ['maxStringLength:50'], errorMessages: [<Trans>Max50</Trans>] };
const isPesel = { validators: ['maxStringLength:11', 'matchRegexp:^(([0-9]{2}[0-1][0-9][0-3][0-9]{6})|([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]))$'], errorMessages: [<Trans>Max11</Trans>, <Trans>IsPesel</Trans>] };
const isPhone = { validators: ['maxStringLength:9', 'isNumber'], errorMessages: [<Trans>Max9</Trans>, <Trans>IsNumber</Trans>] };

export { requiredField, requiredMax15, requiredMax50, requiredPesel, requiredPhone, requiredFloat, requiredOrNNMax50, requiredOrNNMax15, requiredPeselOrNN, requiredPhoneOnNN, isEmail, max50, isPesel, isPhone };