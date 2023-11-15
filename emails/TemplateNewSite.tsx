import React from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Tailwind,
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
      <Preview>Welcome aboard!</Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Text className="font-bold text-3xl">Site Details</Text>
            <Text>{props.startDate}</Text>
            <Text>{props.streetNumberName}</Text>
            <Text>{props.cityTown}</Text>
            <Text>{props.province}</Text>
            <Text>{props.postal}</Text>
            <Text>{props.assignment}</Text>
            <Text>{props.assignmentType}</Text>
            <Text>{props.withVehicle}</Text>
            <Text>{props.details}</Text>
            <Text>{props.clName}</Text>
            <Text>{props.clCompany}</Text>
            <Text>{props.clPhone}</Text>
            <Text>{props.clEmail}</Text>
            <Text>{props.clAddress}</Text>
            <Text>{props.clSSFNs}</Text>
            <Text>{props.prName}</Text>
            <Text>{props.prCompany}</Text>
            <Text>{props.prPhone}</Text>
            <Text>{props.prEmail}</Text>
            <Text>{props.prAddress}</Text>
            <Text>{props.prSSFNs}</Text>
            <Text>{props.assignedToFirstName}</Text>
            <Text>{props.assignedToLastName}</Text>
            <Link href="https://esmsolutions.ca/">www.esmsolutions.ca</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TemplateNewSite;
