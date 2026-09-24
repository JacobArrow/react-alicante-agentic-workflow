import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerSessions } from "@/utils/speakers";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speaker: SpeakerSessions;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        {/* h2: PageHeading above renders the page's only h1, so each card's
            title is the next level down, not a sibling h3. */}
        <CardTitle as="h2" fontSize="md">
          {speaker.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Flex
          as="ul"
          direction="column"
          gap="2"
          listStyleType="none"
          margin="0"
          padding="0"
        >
          {speaker.sessions.map((session) => (
            <Flex as="li" key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Flex
                  justify="space-between"
                  align="baseline"
                  gap="3"
                  paddingY="1"
                  _hover={{ textDecoration: "underline" }}
                >
                  <Text truncate>{session.title}</Text>
                  <Text
                    flexShrink="0"
                    fontSize="sm"
                    color="var(--text-secondary)"
                  >
                    {session.startTime}
                  </Text>
                </Flex>
              </Link>
            </Flex>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
