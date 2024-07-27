'use client';

import {ActionIcon, Container, Group, Image, rem, Text} from '@mantine/core';
import {IconBrandBilibili, IconBrandGithub} from '@tabler/icons-react';
import Link from 'next/link';
import classes from './Footer.module.css';
import webConfig from "@/config";

const data = webConfig.footerLinks

export function Footer() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <a
                key={index}
                className={classes.link}
                href={link.link}
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </a>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Image radius="md" h={40} w="auto" fit="contain" src="/images/logo/logo black.png"/>
                    <Text size="xs" c="dimmed" className={classes.description}>
                        专注于芳文相关内容！
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    © 2024 芳文观星台. All rights reserved.
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon
                        component={Link}
                        href="https://space.bilibili.com/1585955812"
                        size="lg"
                        color="gray"
                        variant="subtle"
                    >
                        <IconBrandBilibili
                            style={{
                                width: rem(18),
                                height: rem(18),
                            }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon component={Link} href="/" size="lg" color="gray" variant="subtle">
                        <IconBrandGithub
                            style={{
                                width: rem(18),
                                height: rem(18),
                            }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
