<template>
    <div class="container">
        <!-- <v-divider></v-divider> -->
        <div class="top">
            <div class="about">
                <div class="heading">About SnapShare</div>
                <div class="text">
                    Snapshare is a website that can give use ability to share
                    image over internet
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
                            <a href="https://vuejs.org/" class="link">
                                VueJS
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
                    <span class="highlight">Copyright by SnapShare</span>
                </div>
                <div class="powered">
                    Powered By <span class="highlight">Nguyen Ngoc Minh</span>
                </div>
            </div>
            <div class="links">
                <a class="link" href="https://github.com/Haxxu">
                    <q-btn round color="primary" size="15px">
                        <font-awesome-icon :icon="['fab', 'github']" />
                    </q-btn>
                </a>
                <a
                    class="link"
                    href="https://www.facebook.com/profile.php?id=100014062937836"
                >
                    <q-btn color="primary" round size="15px">
                        <font-awesome-icon :icon="['fab', 'facebook']" />
                    </q-btn>
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
                font-size: 18px;
                font-weight: 700;
                color: var(--text-primary);
            }

            .text {
                margin-top: 10px;
                font-size: 20px;
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
                    font-size: 18px;
                    font-weight: 700;
                }
            }

            .other {
                padding: 10px;
                margin-left: 20px;

                .heading {
                    font-size: 18px;
                    font-weight: 700;
                }
            }

            .links {
                list-style-type: none;
                padding: 15px;
                .link {
                    display: inline-block;
                    text-decoration: none;
                    font-size: 14px;
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
        align-items: center;
        justify-content: space-between;
        font-size: 15px;

        .info {
            .copyright {
                padding: 10px 0;
            }
            .powered {
                padding: 10px 0;
            }
        }

        .highlight {
            color: var(--primary-color);
            font-weight: 700;
        }

        .links {
            .link {
                margin-left: 4px;
            }
        }
    }
}
</style>
