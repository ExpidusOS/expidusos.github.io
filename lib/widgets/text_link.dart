import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class TextLink extends StatelessWidget {
  TextLink(Uri this.uri, String? this.text, {Key? key, this.style = null}) : super(key: key);

  final String? text;
  final TextStyle? style;
  final Uri uri;

  String getText() {
    return this.text == null ? this.uri.toString() : this.text!;
  }

  @override
  Widget build(BuildContext context) =>
    Tooltip(
      child: InkWell(
        child: Text(
          this.getText(),
          style: this.style,
        ),
        mouseCursor: SystemMouseCursors.click,
        onTap: () {
          launchUrl(this.uri);
        },
      ),
      textStyle: this.style,
      preferBelow: true,
      message: this.uri.toString(),
    );
}
