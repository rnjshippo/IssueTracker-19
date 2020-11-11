import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { labelService } from '@services';
import { flex, flexColumn, calFontColor } from '@styles/utils';
import { colors } from '@styles/variables';
import { LabelTag } from '@components';
import { SubmitButton, CancelButton } from '@shared';
import { calcFontColor, pickRandomColor } from '@styles/utils';
import { LabelBoxContext } from '@components/LabelBox/LabelBoxContext';

const Box = styled.form`
  ${flexColumn};
  background-color: ${colors.lightestGray};
  padding: 1.5rem;
`;

const InputLabel = styled.label`
  font-weight: bold;
`;

const InputBox = styled.input`
  padding: 0.25em;
  width: ${props => (props.width ? props.width : 'auto')};

  font-size: inherit;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  outline: none;

  &:focus {
    border: 1px solid skyblue;
    box-shadow: 0 0 5px 0 skyblue;
  }
`;

const EditHeader = styled.div`
  ${flex('space-between')}
  margin-bottom: 1.5rem;
`;

const EditBody = styled.div`
  ${flex('space-between')}

  & > * {
    margin: 0 10px;
  }
`;

const ItemBox = styled.div`
  ${flexColumn}
  flex-grow: ${props => (props.flexGrow ? props.flexGrow : 0)};
`;

const ItemBoxRow = styled.div`
  ${flex}
  margin-top: ${props => (props.marginTop ? 'auto' : 0)};
  flex-grow: ${props => (props.flexGrow ? props.flexGrow : 0)};

  & > * {
    margin: 0 3px;
  }
`;

const DeleteButton = styled.button`
  margin: auto;
  font-size: inherit;
  color: ${colors.black6};
  outline: none;
  border: none;
  cursor: pointer;
`;

const ColorButton = styled.button`
  background-color: ${props => props.backgroundColor};
  border: none;
  border-radius: 5px;
  outline: none;
  line-height: 0;
  cursor: pointer;
`;

const svgConfig = styled.svg.attrs({
  viewbox: '0 0 16 16',
  version: '1.1',
  ariaHideen: 'true',
})``;

const ColorIcon = styled(svgConfig)`
  fill: ${props => calcFontColor(props.backgroundColor)};
  width: 16px;
  height: 16px;
`;

export default function LabelEditBox({
  no = null,
  name = '',
  description = '',
  color = pickRandomColor(),
  reloadLabels,
  setEditingLabels,
  editingLabels,
}) {
  const [label, setLabel] = useState({ no, name, description, color });
  const { toggleIsAdding } = useContext(LabelBoxContext);

  const handleLabel = ({ target }) => {
    const { name, value } = target;
    setLabel({ ...label, [name]: value });
  };

  const handleColorButton = () => {
    setLabel({ ...label, color: pickRandomColor() });
  };

  const handleDelete = async () => {
    if (!confirm(`${label.name} 레이블을 삭제 하시겠습니까?`)) return;

    try {
      const { status } = await labelService.deleteLabel({
        no,
      });
      reloadLabels();
    } catch ({ response: { status } }) {}
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (label.no) {
      // Edit label
      try {
        const { status } = await labelService.editLabel({
          no: label.no,
          name: label.name,
          description: label.description ? label.description : null,
          color: label.color,
        });

        // Success
        if (status === 200) {
          handleCancel();
          reloadLabels();
        }
      } catch ({ response: { status } }) {
        if (status === 500) {
          alert('중복된 레이블 이름입니다');
        }

        if (status === 400) {
          alert('올바르지 않은 입력 값 입니다');
        }
      }
    } else {
      // Add label
      try {
        const { status } = await labelService.addLabel({
          name: label.name,
          description: label.description ? label.description : null,
          color: label.color,
        });

        // Success
        if (status === 201) {
          toggleIsAdding();
          reloadLabels();
        }
      } catch ({ response: { status } }) {
        if (status === 500) {
          alert('중복된 레이블 이름입니다');
        }

        if (status === 400) {
          alert('올바르지 않은 입력 값 입니다');
        }
      }
    }
  };

  const handleCancel = () => {
    if (label.no) {
      // Editing
      setEditingLabels(new Set([...editingLabels].filter(labelID => labelID !== label.no)));
    } else {
      // Adding
      toggleIsAdding();
    }
  };

  return (
    <Box onSubmit={handleSubmit}>
      <EditHeader>
        <ItemBox>
          <LabelTag name={label.name} color={label.color} />
        </ItemBox>
        <ItemBox>
          {label.no ? (
            <DeleteButton trpe="button" onClick={handleDelete}>
              Delete
            </DeleteButton>
          ) : null}
        </ItemBox>
      </EditHeader>
      <EditBody>
        <ItemBox flexGrow={1}>
          <InputLabel>Label Name</InputLabel>
          <InputBox name="name" type="text" onChange={handleLabel} value={label.name} required />
        </ItemBox>
        <ItemBox flexGrow={4}>
          <InputLabel>Description</InputLabel>
          <InputBox
            name="description"
            type="text"
            onChange={handleLabel}
            value={label.description ? label.description : ''}
          />
        </ItemBox>
        <ItemBox>
          <InputLabel>Color</InputLabel>
          <ItemBoxRow>
            <ColorButton type="button" backgroundColor={label.color} onClick={handleColorButton}>
              <ColorIcon backgroundColor={label.color}>
                <path
                  fillRule="evenodd"
                  d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z"
                ></path>
              </ColorIcon>
            </ColorButton>
            <InputBox
              width={'5em'}
              name="color"
              type="text"
              onChange={handleLabel}
              value={label.color}
            />
          </ItemBoxRow>
        </ItemBox>
        <ItemBoxRow marginTop={true}>
          <CancelButton type="button" onClick={handleCancel}>
            Cancel
          </CancelButton>
          <SubmitButton>{label.no ? 'Save changes' : 'Create Label'}</SubmitButton>
        </ItemBoxRow>
      </EditBody>
    </Box>
  );
}