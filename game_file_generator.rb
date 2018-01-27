arr =[]
File.open('words_alpha.txt', 'r') do |file|
  file.each_line do |word|
    arr << word.strip
  end
end
correct_words =[]
arr.each do |word|
  if word.length ==4 && word !~ /([a-z]).*\1/
    correct_words << word
  end
end


File.open('game_words.txt', 'w+') do |file|
  file.puts correct_words
end
