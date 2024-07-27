import { Button, Container, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { Illustration } from './404Background';
import classes from './NothingFoundBackground.module.css';

export function NothingFoundBackground() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>这里似乎并没有你希望找到的小行星</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            寻找小行星这一目标还是朦朦胧胧无处下手，但像这河滩上找到的，小化石一样的行星一定存在着
            <br />
            在这宇宙的某处
          </Text>
          <Group justify="center">
            <Button component={Link} href="/" size="md">
              去看看已知的小行星吧
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
