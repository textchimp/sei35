# 1. Create an array of the days of the week
# Create a variable named days_of_the_week as an array of the following:
# Monday
# Tuesday
# Wednesday
# Thursday
# Friday
# Saturday
# Sunday
# days_of_the_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

days_of_the_week = %w{ Monday Tuesday Wednesday Thursday Friday Saturday Sunday }

p days_of_the_week

# 2. My calendar says the first day is Sunday...
# Remove Sunday from the last postion and move it to the first position. Use array methods.
moved_day = days_of_the_week.pop
days_of_the_week.unshift moved_day

# one-liner:
# days_of_the_week.unshift( days_of_the_week.pop )

# RTFM
# days_of_the_week.rotate! -1

p days_of_the_week

# 3. Create a new array of the days of the week:
# The first inner array should be the weekdays
# The second inner array should be the weekend days
days_of_the_week = %w{ Monday Tuesday Wednesday Thursday Friday Saturday Sunday }

week_days = days_of_the_week[0..4]
weekend_days = days_of_the_week[5..6]

week_parts = [ week_days, weekend_days ]

# week_parts = [
#   days_of_the_week[0..4],
#   days_of_the_week[5..6]
# ]

p week_parts


# 4. Remove either the weekdays or the weekends
# Your choice...
week_parts.pop
p week_parts

# 5. Sort the remaining days alphabetically
# sorted_week_days = week_parts.first.sort
# p sorted_week_days

week_parts.first.sort!

p week_parts
