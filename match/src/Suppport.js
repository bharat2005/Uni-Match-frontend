"use client";
import * as React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const NotificationComponent = () => {
  return (
    <Box
      component="article"
      sx={{
        fontFamily: '"Noto Sans SC", sans-serif',
        maxWidth: { xs: "100%", md: "750px" },
        margin: { xs: "0 10px", md: "0 auto" },
        bgcolor: "#ffffff",
      }}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          padding: { xs: "12px", sm: "15px" },
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <IconButton
          sx={{
            color: "#333",
            marginRight: "10px",
            "& svg": {
              fontSize: "20px",
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 500,
            color: "#333",
          }}
        >
          实名认证通知
        </Typography>
      </Box>

      <Box
        component="main"
        sx={{
          padding: {
            xs: "12px",
            sm: "15px",
            md: "20px",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "13px", sm: "14px" },
            lineHeight: 1.6,
            color: "#333",
            marginBottom: "20px",
          }}
        >
          为贯彻落实《市场监管总局办公厅关于进一步做好经营主体登记实名认证工作的通知》（市监注发[2023]
          88
          号）要求，进一步优化实名认证流程，加强实名认证信息和档案管理，完善实名审查工作规范。结合我省实际，省局已升级改造实名认证信息化系统，自2024年1月1日起切换新的实名认证服务，现就做好登记实名认证相关工作通知如下：
        </Typography>

        <Box
          sx={{
            height: "120px",
            background: "linear-gradient(135deg, #ffedeb, #fff5f4)",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        />

        <Box component="section" sx={{ marginBottom: "20px" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "13px", sm: "14px" },
              fontWeight: 500,
              color: "#333",
              marginBottom: "10px",
            }}
          >
            一、深化认识实名认证工作重要性
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "13px", sm: "14px" },
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            实名认证是保障经营者自身合法权益最直接、最有效的手段。各地登记机关要高度重视，不折不扣落实总局工作部署，强化实名认证审查要求，加强组织实施，为经营主体提供更加安全、规范、便利的登记服务。按照"一事一人一认证"的原则，对于每一笔登记、备案业务，各地登记机关应当对需要办理实名认证的每名人员进行单次独立核验。强化实名认证同登记业务的关联，要求实名认证人员对登记备案业务进行确认。
          </Typography>
        </Box>

        <Box component="section" sx={{ marginBottom: "20px" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "13px", sm: "14px" },
              fontWeight: 500,
              color: "#333",
              marginBottom: "10px",
            }}
          >
            二、优化实名认证和在线签名流程
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "13px", sm: "14px" },
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            实名认证不等同于电子签名，目前省级层面还需分别进行实名认证和电子签名，《经营主体登记实名认证业务流程》详见附件。相关自然人可以通过总局"登记注册实名认证"应用程序或小程序服务方式，采用人脸识别方式进行实名验证。通过全程电子化方式办理的，按照电子签名有关要求，相关自然人还需单独进行在线签名。广州、深圳等有条件地市可以根据实际，采用地市级自建"实名认证"平台
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationComponent;
