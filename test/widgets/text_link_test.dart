import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:expidus_website/widgets/text_link.dart';

void main() {
  testWidgets('Use link as title', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: TextLink(Uri.parse('https://google.com'), null),
      ),
    ));

    expect(find.text('https://google.com'), findsOneWidget);
  });
}
