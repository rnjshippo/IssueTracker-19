import React, { useState } from 'react';
import styled from 'styled-components';
import { API } from '@api';
import { flexColumn, flexCenter, flex } from '@styles/utils';
import { SubmitButton, CancelButton } from '@shared';
import { colors } from '@styles/variables';

const Form = styled.form`
  width: 100%;
  ${flexColumn}
`;
const Container = styled.div`
  margin-bottom: 10px;
  margin-top: 16px;
  padding-bottom: 5px;
  border-top: 1px solid ${colors.borderColor};
  border-bottom: 1px solid ${colors.borderColor};
`;
const InputBox = styled.label`
  ${flexColumn}
  margin:10px;
`;
const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
`;
const Input = styled.input`
  width: 440px;
  padding: 5px 12px;
  background-color: #fafbfc;
  border-radius: 6px;
  border: 1px solid ${colors.borderColor};
  font-size: 16px;
`;
const Textarea = styled.textarea`
  height: 200px;
  width: 700px;
  padding: 8px;
  overflow: auto;
  background-color: #fafbfc;
  border-radius: 6px;
  border: 1px solid ${colors.borderColor};
  font-size: 14px;
`;
const SubmitBox = styled.div`
  margin: 5px 60px;
  display: flex;
  justify-content: flex-end;
`;
const CancelDiv = styled.div`
  ${flexCenter}
`;
const ButtonSpace = styled.div`
  margin-left: 7px;
`;
export default function MilestoneEditBox({ isNew }) {
  return (
    <Form>
      <Container>
        <InputBox>
          <Label htmlFor="milestone_title">Title</Label>
          <Input type="text" id="milestone_title" placeholder="Title" />
        </InputBox>
        <InputBox>
          <Label htmlFor="milestone_date">Due date (Optional)</Label>
          <Input type="date" id="milestone_date" placeholder="yyyy-mm-dd" />
        </InputBox>
        <InputBox>
          <Label htmlFor="milestone_description">Description</Label>
          <Textarea cols="40" rows="20" />
        </InputBox>
      </Container>
      <SubmitBox>
        {isNew ? (
          <SubmitButton>Create milestone</SubmitButton>
        ) : (
          <CancelDiv>
            <ButtonSpace>
              <CancelButton>Cancel</CancelButton>
            </ButtonSpace>
            <ButtonSpace>
              <CancelButton>Close milestone</CancelButton>
            </ButtonSpace>
            <ButtonSpace>
              <SubmitButton>Save changes</SubmitButton>
            </ButtonSpace>
          </CancelDiv>
        )}
      </SubmitBox>
    </Form>
  );
}