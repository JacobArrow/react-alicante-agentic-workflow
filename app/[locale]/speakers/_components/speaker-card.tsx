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
        <CardTitle fontSize="lg">{speaker.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="2">
          {speaker.sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Flex
                justify="space-between"
                align="baseline"
                gap="3"
                _hover={{ color: "var(--accent-hex)" }}
              >
                <Text truncate>{session.title}</Text>
                <Text flexShrink="0" fontSize="sm" color="var(--text-muted)">
                  {session.startTime}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
