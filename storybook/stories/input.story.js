// @flow

import React from "react";
import { storiesOf } from '@storybook/react-native';
import Input from "../../src/components/Input";

storiesOf("Input", module).add("Default", () => <Input onPress={() => {}} placeholder="Type Something" />);
