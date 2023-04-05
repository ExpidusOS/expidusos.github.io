import 'package:flutter/material.dart';
import 'package:expidus_website/layouts.dart';
import 'package:expidus_website/widgets.dart';
import 'package:expidus_website/utils.dart';
import 'package:url_launcher/url_launcher.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key, required this.themeNotifier}) : super(key: key);

  final ValueNotifier<ThemeMode> themeNotifier;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    var isNotLarge = AutoScaler.ltLarge.fits(MediaQuery.of(context));
    var cardWidth = MediaQuery.of(context).size.width / 1.6;

    var cards = <Widget>[
      SimpleCard(
        margin: EdgeInsets.all(8.0),
        children: [
          Text(
            'Cross Platform',
            style: Theme.of(context).textTheme.headlineLarge,
          ),
          RichText(
            text: TextSpan(
              children: [
                TextSpan(
                  text: 'Designed for more than just your laptop or desktop, ExpidusOS can be used on phones and tablets. ',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
                TextSpan(
                  text: 'We plan on supporting a large range of devices, even handheld game consoles. ',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
                TextSpan(
                  text: 'You can view our ',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
                WidgetSpan(
                  alignment: PlaceholderAlignment.baseline,
                  baseline: TextBaseline.alphabetic,
                  child: TextLink(
                    Uri.parse('https://wiki.expidusos.com/devices'),
                    'wiki',
                    style: Theme.of(context).textTheme.bodyLarge!.copyWith(
                      color: Theme.of(context).colorScheme.primary,
                      fontWeight: FontWeight.bold,
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
                TextSpan(
                  text: ' for more information on our currently supported devices and one\'s we plan on supporting in the future.',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
              ],
              style: Theme.of(context).textTheme.bodyLarge,
            ),
          ),
        ],
      ),
      SimpleCard(
        margin: EdgeInsets.all(8.0),
        children: [
          Text(
            'Free & Open Source',
            style: Theme.of(context).textTheme.headlineLarge,
          ),
          Text(
            'The source code of ExpidusOS is open source and the operating system itself is free. You can download it from this website or build it yourself. ExpidusOS also uses open source technologies like Linux, Zig, Flutter, and Nix.',
            style: Theme.of(context).textTheme.bodyLarge,
          ),
        ],
      ),
      SimpleCard(
        margin: EdgeInsets.all(8.0),
        children: [
          Text(
            'Easy to use',
            style: Theme.of(context).textTheme.headlineLarge,
          ),
          Text(
            'ExpidusOS uses modern design technologies to adapt its layout between mobile and desktop devices. This means you can enjoy the same experience on your phone and desktop with ExpidusOS.',
            style: Theme.of(context).textTheme.bodyLarge,
          ),
        ],
      )
    ].map((card) => isNotLarge ? Flexible(flex: 1, child: card) : Row(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [SizedBox(width: cardWidth, child: card)],
    )).toList();
    return DefaultLayout(
      themeNotifier: widget.themeNotifier,
      child: ListView(
        padding: EdgeInsets.all(16.0),
        children: [
          Container(
            height: MediaQuery.of(context).size.height / 2.95,
            decoration: BoxDecoration(
              image: DecorationImage(
                fit: BoxFit.cover,
                image: AssetImage('assets/img/expidus.jpg'),
              ),
            ),
            child: Align(
              alignment: Alignment.bottomRight,
              child: SimpleCard(
                children: [
                  Text(
                    'Introducing ExpidusOS',
                    style: Theme.of(context).textTheme.headlineLarge,
                  ),
                  Text(
                    'A modern operating system for mobile and desktop devices.',
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                ],
              ),
            ),
          ),
          Center(
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: 8.0),
              child: Text(
                'Features',
                style: Theme.of(context).textTheme.headlineLarge,
              ),
            ),
          ),
        ] + (isNotLarge ? [
          Flex(
            direction: Axis.vertical,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: cards,
          ),
        ] : cards),
      ),
    );
  }
}
