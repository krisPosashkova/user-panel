import { Container, Box, Grid2, Typography } from "@mui/material";
import { CustomLink } from "@/styles/components";
import {
    gridStyles,
    containerStyles,
    mainBoxStyles,
    typographyStyles,
} from "./authPage.styled";
import Header from "@/components/Header";
import { AuthPageProps } from "@/types/components/auth-page.types";

const AuthPage: React.FC<AuthPageProps> = ({
    form,
    linkText,
    linkHref,
    prompt,
}) => {
    return (
        <>
            <Header />
            <Grid2 container sx={gridStyles.container}>
                <Grid2
                    size={{ xs: 0, md: 6 }}
                    sx={gridStyles.background}></Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} sx={gridStyles.content}>
                    <Container maxWidth="sm" sx={containerStyles.root}>
                        <Box component="main" sx={mainBoxStyles.root}>
                            {form}
                        </Box>
                        <Typography
                            component="div"
                            variant="body1"
                            sx={typographyStyles.root}>
                            <Typography>{prompt}</Typography>
                            <CustomLink href={linkHref}>{linkText}</CustomLink>
                        </Typography>
                    </Container>
                </Grid2>
            </Grid2>
        </>
    );
};

export default AuthPage;
