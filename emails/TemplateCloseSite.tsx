import React from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Preview,
  Section,
  Img,
  Heading,
  Row,
  Column,
} from '@react-email/components';

interface TemplateCloseSiteProps {
  endDate: string;
  fileNumber: string;
  streetNumberName: string;
  cityTown: string;
  province: string;
  postal: string;
  assignedToFirstName: string;
  assignedToLastName: string;
}

const TemplateCloseSite = (props: TemplateCloseSiteProps) => {
  return (
    <Html>
      <Preview>
        File Number: {props.fileNumber ? props.fileNumber : 'None'} -{' '}
        {props.streetNumberName}, {props.cityTown}, {props.province}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`https://xpera.ca/media/c5c1ae1f-4cfb-4871-93ca-4ddb18cf6446/MxgzLQ/Logos/ESM-Logo.jpg?mw=200&sh=f73a5`}
              width="120"
              height="55"
              alt="ESM Logo"
            />
          </Section>
          <Heading style={h1}>CLOSE SITE</Heading>
          <Text style={heroText}>
            Please close and invoice the file for the following site at your
            convenience.
          </Text>
          <Row>
            <Column style={columnHeader}>SITE DETAILS</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Requested By</Column>
            <Column style={rowData}>
              {props.assignedToFirstName} {props.assignedToLastName}
            </Column>
          </Row>
          <Row>
            <Column style={rowHeader}>File Number</Column>
            <Column style={rowData}>
              {props.fileNumber ? props.fileNumber : 'None'}
            </Column>
          </Row>
          <Row>
            <Column style={rowHeader}>End Date</Column>
            <Column style={rowData}>{props.endDate}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Address</Column>
            <Column style={rowData}>
              {props.streetNumberName}, {props.cityTown}, {props.province}{' '}
              {props.postal}
            </Column>
          </Row>
        </Container>
      </Body>
    </Html>
  );
};

export default TemplateCloseSite;

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontSize: '18px',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
};

const logoContainer = {
  marginTop: '32px',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '30px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '34px',
};

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
};

const columnHeader = {
  backgroundColor: '#CCCCCC',
  fontSize: '20px',
  fontWeight: '700',
  padding: '10px',
};

const rowHeader = {
  width: '150px',
  fontSize: '16px',
  fontWeight: '700',
  padding: '10px',
};

const rowData = {
  fontSize: '16px',
  padding: '10px',
};
