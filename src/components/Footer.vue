<template>
    <div class="container">
        <!-- <v-divider></v-divider> -->
        <div class="top">
            <div class="about">
                <div class="heading">About Catchy Music</div>
                <div class="text">
                    Catchy Music is a music website that can give user
                    interested experience
                </div>
            </div>
            <div class="info">
                <div class="techniques">
                    <div class="heading">Techniques</div>
                    <ul class="links">
                        <li>
                            <a href="https://www.mongodb.com/" class="link">
                                MongoDB
                            </a>
                        </li>
                        <li>
                            <a href="https://expressjs.com/" class="link">
                                ExpressJS
                            </a>
                        </li>
                        <li>
                            <a href="https://reactjs.org/" class="link">
                                ReactJS
                            </a>
                        </li>
                        <li>
                            <a href="https://nodejs.org/en/" class="link">
                                NodeJS
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="other">
                    <div class="heading">Other</div>
                    <ul class="links">
                        <li>
                            <a href="https://www.javascript.com/" class="link">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="https://reactjs.org/" class="link">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="https://mui.com/" class="link">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- <v-divider></v-divider> -->
        <div class="bottom">
            <div class="info">
                <div class="copyright">
                    &copy;
                    <span class="highlight">Copyright by Catchy Music</span>
                </div>
                <div class="powered">
                    Powered By <span class="highlight">Nguyen Ngoc Minh</span>
                </div>
            </div>
            <div class="link">
                <a class="link" href="https://github.com/Haxxu">
                    Github
                    <!-- <v-btn color="primary" icon>
                        <v-icon size="30">mdi-github</v-icon>
                    </v-btn> -->
                </a>
                <a
                    class="link"
                    href="https://www.facebook.com/profile.php?id=100014062937836"
                >
                    Facebook
                    <!-- <v-btn color="primary" icon>
                        <v-icon size="30">mdi-facebook</v-icon>
                    </v-btn> -->
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding: 24px 32px;
    /* margin-top: 70px; */

    .top {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;

        .about {
            margin-right: 15px;
            .heading {
                font-size: 1.4rem;
                font-weight: 700;
                color: var(--text-primary);
            }

            .text {
                margin-top: 10px;
                font-size: 1.6rem;
                color: var(--text-primary);
            }
        }

        .info {
            display: flex;
            justify-content: space-between;

            .techniques {
                padding: 10px;
                margin-left: 20px;

                .heading {
                    font-size: 1.3rem;
                    font-weight: 700;
                }
            }

            .other {
                padding: 10px;
                margin-left: 20px;

                .heading {
                    font-size: 1.3rem;
                    font-weight: 700;
                }
            }

            .links {
                list-style-type: none;
                padding: 10px;
                .link {
                    display: inline-block;
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    padding: 5px 0px;

                    &:hover {
                        color: var(--text-secondary);
                    }
                }
            }
        }
    }

    .bottom {
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        font-size: 1rem;

        .info {
            .copyright {
                padding: 10px 0;
            }
            .powerd {
                padding: 10px 0;
            }
        }

        .highlight {
            color: var(--primary-color);
            font-weight: 700;
        }
    }
}
</style>
