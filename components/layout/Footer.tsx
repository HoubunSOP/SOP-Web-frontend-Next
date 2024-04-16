'use client';

import { Text, Container, ActionIcon, Group, rem, Image } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './Footer.module.css';

const data = [
  {
    title: '相关页面',
    links: [
      {
        label: '隐私协议',
        link: 'https://web6or1pcx.feishu.cn/docx/HarndmlnwoFDMqxjxCzcW86anRc?from=from_copylink',
      },
      {
        label: '网站待办看板',
        link: 'https://web6or1pcx.feishu.cn/docx/XiAHddZ9Eopchbxw1OAcVsEOnve?from=from_copylink',
      },
      {
        label: '免责说明',
        link: 'https://web6or1pcx.feishu.cn/docx/LqA6d7c2JoTSfKxHGADcimXhncz?from=from_copylink',
      },
    ],
  },
  {
    title: '联系我们',
    links: [
      { label: 'bilibili', link: 'https://space.bilibili.com/1585955812' },
      { label: '水群2群：729479808', link: '#' },
      { label: '组群：478991875', link: '#' },
    ],
  },
];

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
          <Image radius="md" h={40} w="auto" fit="contain" src="/images/logo/logo black.png" />
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
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
