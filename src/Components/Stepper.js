import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { MdDescription } from "react-icons/md";
import StepWizard from "react-step-wizard";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import {Button} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "full",
    },
  },
};

const ActionButtons = (props) => {
  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.nextStep();
  };

  const handleFinish = () => {
    props.lastStep();
  };

  return (
    <div>
      <Row>
        {props.currentStep > 1 && (
          <Col>
            <Button onClick={handleBack}>Back</Button>
          </Col>
        )}
        <Col>
          {props.currentStep < props.totalSteps && (
            <Button onClick={handleNext}>Next</Button>
          )}
          {props.currentStep === props.totalSteps && (
            <Button onClick={handleFinish}>Finish</Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

const One = (props) => {
  const [info1, setInfo1] = useState({});
  const [error, setError] = useState("");
  const [bankName, setBankName] = useState(null)

  const onInputChanged = (event) => {
    console.log(event.target.value)

    setBankName(event.target.value)

    setInfo1((info1) => ({
      ...info1,
      bankName:event.target.value
    }));
  };

  const validate = () => {
    if (!bankName) setError("Name is mandatory field");
    else {
      setError("");
      props.nextStep();
      props.userCallback(info1);
    }
  };

  const names = ['State Bank of India','Axis Bank','ICICI'];

  return (
    <div>
      <span style={{ color: "red" }}>{error}</span>
      <Box sx={{marginBottom:"10px"}}>
      <Typography sx={{fontSize:"24px",fontWeight:"500"}}>Step 1</Typography>
      </Box>
      <FormGroup>
        <Typography sx={{fontSize:"15px", fontWeight:"500", marginLeft:"1px"}}>Bank Name</Typography>

    <Select 
    sx={{width:1}}
    placeholder="Select Bank Name"
    onChange={(e)=> onInputChanged(e)}
    MenuProps={MenuProps}>
    {names.map((name) => (
        <MenuItem
          key={name}
          value={name}
        >
          {name}
        </MenuItem>
      ))}
    </Select>
      </FormGroup>
      <br />
      <ActionButtons {...props} nextStep={validate} />
    </div>
  );
};

const Two = (props) => {
  const [info2, setInfo2] = useState({});
  const [error, setError] = useState("");
  const [ifsc, setIfsc] = useState("")

  const onInputChanged = (event) => {
    setIfsc(event.target.value)

    setInfo2((info2) => ({
      ...info2,
      ifsc:event.target.value
    }));
  };

  const validate2 = () => {
    if (!ifsc) setError("IFSC is mandatory field");
    else {
      setError("");
      props.nextStep();
      props.userCallback(info2);
    }
  };

  const ifscArray = ["IFSC1","IFSC2","IFSC3"]

  return (
    <div>
      <span style={{ color: "red" }}>{error}</span>
      <h1>This is step 2 content</h1>
      <FormGroup>
        <Typography>
          Welcome <b>{props.user.bankName || ""} </b> User,
        </Typography>
      </FormGroup>
      <FormGroup>
        <Typography sx={{fontSize:"15px", fontWeight:"500", marginLeft:"1px"}}>Choose IFSC Code</Typography>

    <Select 
    sx={{width:1}}
    placeholder="Select Bank Name"
    onChange={(e)=> onInputChanged(e)}
    MenuProps={MenuProps}>
    {ifscArray.map((name) => (
        <MenuItem
          key={name}
          value={name}
        >
          {name}
        </MenuItem>
      ))}
    </Select>
      </FormGroup>
      <br />
      <ActionButtons {...props} nextStep={validate2} />
    </div>
  );
};

const Three = (props) => {
  const handleLastStep = () => {
    props.lastStep();
    props.completeCallback();
  };

  return (
    <Box>
      <Typography sx={{fontSize:"24px",fontWeight:"600"}}>Your Summary</Typography>
      <Box sx={{marginLeft:"15px"}}>
      <p>Bank Name: {props.user.bankName}</p>
      <p>IFSC: {props.user.ifsc}</p>
      </Box>
      <br />
      <ActionButtons {...props} lastStep={handleLastStep} />
    </Box>
  );
};

const StepperComp = () => {
  const [stepWizard, setStepWizard] = useState(null);
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const assignStepWizard = (instance) => {
    setStepWizard(instance);
  };

  const assignUser = (val) => {
    console.log("parent receive user callback");
    console.log(val);
    setUser((user) => ({
      ...user,
      ...val
    }));
  };

  const handleStepChange = (e) => {
    console.log("step change");
    console.log(e);
    setActiveStep(e.activeStep - 1);
  };

  const handleComplete = () => {
    return toast.warn("An Error has been thrown!!")
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        <Step label="Step 1" children={<MdDescription />} />
        <Step label="Personal Detail" />
        <Step label="Confirmation" />
      </Stepper>

      <Box sx={{marginX:"30px", boxShadow:3,padding:"10px"}}>
      <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
        <One userCallback={assignUser} />
        <Two user={user} userCallback={assignUser} />
        <Three user={user} completeCallback={handleComplete} />
      </StepWizard>
      </Box>
    </div>
  );
};

export default StepperComp;
