import { Layout, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const { Footer } = Layout;

function PageFooter(props) {
  return (
    <FooterContainer>
      <CompanyInfo>
        {`${process.env.REACT_APP_COMPANY_NAME} | 대표 : ${process.env.REACT_APP_COMPANY_CEO_NAME}
고객센터 : ${process.env.REACT_APP_CUSTOMER_SERVICE_NUMBER}
개선 및 문의사항 : ${process.env.REACT_APP_COMPANY_EMAIL}
사업자등록번호 : ${process.env.REACT_APP_COMPANY_REGISTRATION_NUMBER}
주소 : ${process.env.REACT_APP_COMPANY_ADDRESS}`}
      </CompanyInfo>
      <Copyright>
        {`Copyright ©  ${process.env.REACT_APP_BRAND_NAME} All rights reserved.`}
      </Copyright>
    </FooterContainer>
  );
}

const FooterContainer = styled(Footer)`
  background-color: var(--bg-body);
  border-top: 1px solid var(--black-alpha-1);
  padding: 16px;
  gap: 4vh;
  display: flex;
  flex-direction: column;
`;

const CompanyInfo = styled(Typography)`
  white-space: pre-line;
  font-size: 12px;
  color: var(--black-alpha-5);
  line-height: 1.8;
`;

const Copyright = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  text-align: right;
  color: var(--black-alpha-9);
`;

export default PageFooter;
