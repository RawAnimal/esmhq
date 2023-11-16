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

interface TemplateNewSiteProps {
  startDate: string;
  streetNumberName: string;
  cityTown: string;
  province: string;
  postal: string;
  assignment: string;
  assignmentType: string;
  withVehicle: string;
  details: string;
  clName: string;
  clCompany: string;
  clPhone: string;
  clEmail: string;
  clAddress: string;
  clSSFNs: string;
  prName: string;
  prCompany: string;
  prPhone: string;
  prEmail: string;
  prAddress: string;
  prSSFNs: string;
  assignedToFirstName: string;
  assignedToLastName: string;
}

const TemplateNewSite = (props: TemplateNewSiteProps) => {
  return (
    <Html>
      <Preview>
        Intake: {props.streetNumberName}, {props.cityTown}, {props.province}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`https://xpera.ca/media/c5c1ae1f-4cfb-4871-93ca-4ddb18cf6446/MxgzLQ/Logos/ESM-Logo.jpg?mw=200&sh=f73a5`}
              width="120"
              height="55"
              alt="ESM"
            />
          </Section>
          <Heading style={h1}>SITE INTAKE</Heading>
          <Text style={heroText}>
            Please open a file for the following site at your convenience.
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
            <Column style={rowHeader}>Start Date</Column>
            <Column style={rowData}>{props.startDate}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Address</Column>
            <Column style={rowData}>
              {props.streetNumberName}, {props.cityTown}, {props.province}{' '}
              {props.postal}
            </Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Assignment/Type</Column>
            <Column style={rowData}>
              {props.assignment} / {props.assignmentType}
            </Column>
          </Row>
          <Row>
            <Column style={rowHeader}>With Vehicle</Column>
            <Column style={rowData}>{props.withVehicle ? 'Yes' : 'No'}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Details</Column>
            <Column style={rowData}>{props.details}</Column>
          </Row>
          <Row>
            <Column style={columnHeader}>CLIENT DETAILS</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Name</Column>
            <Column style={rowData}>{props.clName}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Company</Column>
            <Column style={rowData}>{props.clCompany}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Phone</Column>
            <Column style={rowData}>{props.clPhone}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Email</Column>
            <Column style={rowData}>{props.clEmail}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Address</Column>
            <Column style={rowData}>{props.clAddress}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>SSFNs</Column>
            <Column style={rowData}>{props.clSSFNs}</Column>
          </Row>
          <Row>
            <Column style={columnHeader}>PRINCIPLE DETAILS</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Name</Column>
            <Column style={rowData}>{props.prName}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Company</Column>
            <Column style={rowData}>{props.prCompany}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Phone</Column>
            <Column style={rowData}>{props.prPhone}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Email</Column>
            <Column style={rowData}>{props.prEmail}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>Address</Column>
            <Column style={rowData}>{props.prAddress}</Column>
          </Row>
          <Row>
            <Column style={rowHeader}>SSFNs</Column>
            <Column style={rowData}>{props.prSSFNs}</Column>
          </Row>
        </Container>
      </Body>
    </Html>
  );
};

export default TemplateNewSite;

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
