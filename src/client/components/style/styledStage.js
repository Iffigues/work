import styled from 'styled-components'

const styledStage = styled.div`
margin: auto;
display: grid;
grid-template-rows: repeat(
  ${props => props.height},
  calc(${props => (props.isOtherUser) ? '15vw' : '25vw'} / ${props => props.width})
);
grid-template-columns: repeat(${props => props.width}, 1fr);
grid-gap: 1px;
border: 2px solid rgba(222, 242, 254, 0.6);
width: 100%;
max-width: ${props => (props.isOtherUser) ? '15vw' : '25vw'};
background: #fffff;
`
export default styledStage;