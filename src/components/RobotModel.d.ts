import { GroupProps } from '@react-three/fiber';

export interface RobotModelProps extends Partial<GroupProps> {
    isSpeaking?: boolean;
    position?: [number, number, number];
    scale?: number;
}

export default function RobotModel(props: RobotModelProps): JSX.Element;
